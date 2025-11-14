import { Injectable, signal } from '@angular/core';
import { ArticleRecord } from 'src/app/shared/models/article.record';
import { supabase } from 'src/backend/infrastructure/supabase/superbase-client';

@Injectable({ providedIn: 'root' })
export class ArticlesService {
  articles = signal<ArticleRecord[]>([]);

  async getArticles() {
    const { error, data } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error getting articles from database', error.message);
      return;
    }

    this.articles.set(data as ArticleRecord[]);
  }
}
