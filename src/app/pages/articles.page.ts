import { Component, computed, signal } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ArticleComponent } from '../components/article/article.component';
import { HlmNumberedPagination } from 'src/app/libs/ui/pagination/src';
import { ArticlesService } from '../services/articles.service';

@Component({
  selector: 'app-articles-page',
  standalone: true,
  imports: [NavbarComponent, ArticleComponent, HlmNumberedPagination],
  template: `
    <app-navbar />

    <main class="pt-20 px-4">
      <h2 class="text-3xl font-bold text-center">AKTUELLE ARTIKEL</h2>

      @for (article of paginatedArticles(); track article.id) {
        <app-article [article]="article"></app-article>
      }

      <hlm-numbered-pagination
        [(currentPage)]="currentPage"
        [(itemsPerPage)]="itemsPerPage"
        [totalItems]="totalArticles()"
        [pageSizes]="[itemsPerPage(), 10, 20, 50, 100]"
      />
    </main>
  `,
})
export default class ArticlesPage {
  constructor(public service: ArticlesService) {}

  ngOnInit() {
    this.service.getArticles();
  }

  protected readonly _articles = this.service.articles;

  currentPage = signal<number>(1);
  itemsPerPage = signal<number>(5);

  totalArticles = computed(() => this._articles().length);

  paginatedArticles = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage();
    const end = start + this.itemsPerPage();
    return this._articles().slice(start, end);
  });
}
