import { Injectable, signal } from '@angular/core';
import { ArticleRecord } from 'src/app/libs/models/article.record';
import { supabase } from 'src/backend/infrastructure/supabase/superbase-client';

@Injectable({ providedIn: 'root' })
export class ArticlesService {

	async getAllArticles() : Promise<ArticleRecord[]>{
		const { error, data } = await supabase.from('articles').select('*').order('created_at', { ascending: false });

		if (error) {
			console.error('Error getting articles from database', error.message);
			return [];
		}

		return data.map(this.mapToAritcle);
	}

	private mapToAritcle(data: any) : ArticleRecord {
		return {
			id: data.article_id,
			title: data.title,
			date: data.date,
			author: data.author,
			image: data.image,
			summary: data.summary,
			link: data.link,
			type: data.type
		}
	}
}
