import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'slug'})
export class SlugPipe implements PipeTransform {
  transform(value: string, args: string[]): any {
    if (!value) {
      return;
    }

    // make lower case and trim
    let slug = value.toLowerCase().trim();

    // replace invalid chars with spaces
    slug = slug.replace(/[^a-z0-9\s-]/g, ' ');

    // replace multiple spaces or hyphens with a single hyphen
    slug = slug.replace(/[\s-]+/g, '-');

    return slug;
  }
}
