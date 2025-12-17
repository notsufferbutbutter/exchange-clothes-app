import { Component, computed, signal, inject, effect } from '@angular/core';
import { HlmNumberedPagination } from 'src/app/libs/ui/pagination/src';
import { ArticleComponent } from '../../components/article/article.component';
import { ArticlesService } from '../../services/articles.service';
import { ArticleRecord } from '@ecp/app/libs/models/article.record';

@Component({
	selector: 'app-articles-page',
	imports: [ArticleComponent, HlmNumberedPagination],
	template: `
		<h2 class="text-center text-3xl font-bold p-5">AKTUELLE ARTIKEL</h2>

		@for (article of paginatedArticles(); track article.id) {
			<app-article [article]="article"></app-article>
		}

		<hlm-numbered-pagination
			[(currentPage)]="currentPage"
			[(itemsPerPage)]="itemsPerPage"
			[totalItems]="totalArticles()"
			[pageSizes]="[itemsPerPage(), 10, 20, 50, 100]"
		/>
	`,
})
export default class ArticlesPage {
	private articleService = inject(ArticlesService);
	private articles = signal<ArticleRecord[]>([]);

	public currentPage = signal<number>(1);
	public itemsPerPage = signal<number>(5);
	public totalArticles = computed(() => this.articles().length);
	public paginatedArticles = computed(() => {
		const start = (this.currentPage() - 1) * this.itemsPerPage();
		const end = start + this.itemsPerPage();
		return this.articles().slice(start, end);
	});

	constructor() {
		effect(async () => {
			this.articles.set(await this.articleService.getAllArticles());
		})
	}
}
