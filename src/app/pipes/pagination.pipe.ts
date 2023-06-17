import {Pipe, PipeTransform} from '@angular/core';
import {ISource} from "../models/get-all-news-sources-response.interface";

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  transform(value: ISource[] | null, activePage: number, elementsPerPage: number): ISource[] {
    const lastElement: number = activePage * elementsPerPage;
    const firstElement: number = lastElement - elementsPerPage;

    return [...value?.slice(firstElement, lastElement) as ISource[]];
  }

}
