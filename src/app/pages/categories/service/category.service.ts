import { Injectable, Injector } from '@angular/core';
import { Category } from '../models/category.model';
import { BaseResourceService } from '../../../shared/servide/base-resource-service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseResourceService<Category> {
  constructor(protected injector: Injector) {
    super('api/categories', injector, Category.fromJson);
  }
}
