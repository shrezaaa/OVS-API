import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CacheManagerService } from './cache-manager/services/cache-manager.service';
import { MockProducts } from './mocks/products.mock';
import { MockUsers } from './mocks/users.mock';
import { Product } from './model/product.model';
import { User } from './model/user.model';

@Controller()
export class AppController {
  constructor(private readonly cacheService: CacheManagerService) {}

  async _findUser(userName: string) {
    let userKeys = await this.cacheService.list('U*');
    let users = await this.cacheService.mGet(userKeys);
    let res = users.filter((u: User) => {
      u.userName == userName;
    });
    return res[0];
  }

  @Post('clearRedis') async clearRedis() {
    let result = await this.cacheService.reset();
    return result;
  }

  @Post('simulateUsers') async simulateUsers() {
    let result = await MockUsers.forEach((user, index) => {
      this.cacheService.set(
        'U' + (index + 1001).toString(),
        JSON.stringify(user),
      );
    });
    
    return result;
  }

  @Post('simulateProducts') async simulateProducts() {
    let result = await MockProducts.forEach((product, index) => {
      this.cacheService.set(
        'P' + (index + 1001).toString(),
        JSON.stringify(product),
      );
    });

    return result;
  }

  @Post('addUser')
  async addUser(model: User) {
    let maxKey: number = -1;
    let alreadyIncluded: string[] | number[] = await this.cacheService.list(
      'U*',
    );
    alreadyIncluded.forEach((element, index) => {
      // ex: U10001: string --> 70001: number
      alreadyIncluded[index] = parseInt(element.subtring(1));
      if (maxKey < alreadyIncluded[index]) {
        maxKey = +alreadyIncluded[index];
      }
    });
    await this.cacheService.set(
      'U' + (maxKey + 1).toString(),
      JSON.stringify(model),
    );
  }

  @Get('userList')
  async userList(@Param() model: any = { role: 'IGNORE', name: null }) {
    let userKeys = await this.cacheService.list('U*');
    let users = await this.cacheService.mGet(userKeys);
    let filtered: User[] = [];
    if ((model.role == 'IGNORE', model.name == null)) {
      filtered = users;
    } else if ((model.role == 'IGNORE', model.name != null)) {
      users.forEach((user: User) => {
        if (user.FName == model.name || user.LName == model.name) {
          filtered.push(user);
        }
      });
    } else if (model.role != 'IGNORE') {
      users.forEach((user) => {
        if (user.roleKind == model.role) {
          if (model.name == null) {
            filtered.push(user);
          } else if (user.FName == model.name || user.LName == model.name) {
            filtered.push(user);
          }
        }
      });
    }

    return { result: filtered };
  }

  @Get('userCart')
  async userCart(@Param() UserName: string) {
    this._findUser(UserName);
    return '{}';
  }

  @Get('userFutureCart')
  async userFutureCart(@Param() UserID: string) {
    return '{}';
  }

  @Get('userOrders')
  async userOrders(@Param() UserID: string) {
    return '{}';
  }

  @Post('addToCart')
  async addToCart(@Param() UserID: string, @Param() productKey: string) {
    return '{}';
  }

  @Post('removeFromCart')
  async removeFromCart(@Param() UserID: string, @Param() productKey: string) {
    return '{}';
  }

  @Delete('removeUser')
  async removeUser(@Param() ProductKey: string) {
    let result = await this.cacheService.del(ProductKey);
    return { result };
  }

  @Post('addProduct')
  async addProduct(model: Product) {
    let maxKey: number = -1;
    let alreadyIncluded: string[] | number[] = await this.cacheService.list(
      'P*',
    );
    alreadyIncluded.forEach((element, index) => {
      // ex: P10001: string --> 10001: number
      alreadyIncluded[index] = parseInt(element.subtring(1));
      if (maxKey < alreadyIncluded[index]) {
        maxKey = +alreadyIncluded[index];
      }
    });
    let result = await this.cacheService.set(
      'P' + (maxKey + 1).toString(),
      JSON.stringify(model),
    );
    return { result };
  }

  @Get('productList')
  async productList(@Body() model: any = { title: null, sort: 'ASC' }) {
    let productKeys = await this.cacheService.list('P*');
    let products = await this.cacheService.mGet(productKeys);
    let filtered: Product[] = [];

    if (model.title == null) {
      filtered = products;
    } else {
      products.forEach((product: Product) => {
        if (product.title == model.title) {
          filtered.push(product);
        }
      });
    }
    if (model.sort == 'ASC') {
      filtered = this._sortByKey(filtered, 'price');
    } else if (model.sort == 'DESC') {
      filtered = this._sortByKey(filtered, 'price');
      filtered.reverse();
    }

    return { result: filtered };
  }

  @Delete('removeProduct')
  async removeProduct(@Param() ProductKey: string) {
    let result = await this.cacheService.del(ProductKey);
    return { result };
  }

  @Post('login')
  async login(@Param() UserNmae: string, @Param() Password: string) {
    // TODO: Implement  --> find user and make its isActive flag true.
  }

  @Post('logout')
  async logout(@Param() UserName: string) {
    // TODO: Implement
  }

  _sortByKey(array, key) {
    return array.sort((a, b) => {
      var x = a[key];
      var y = b[key];
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }
}
