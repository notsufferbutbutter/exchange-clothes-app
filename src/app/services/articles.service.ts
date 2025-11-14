import { Injectable, signal } from "@angular/core";
import { ArticleObject } from "src/libs/models/article-object.interface";
import { supabase } from "src/libs/services/superbase-client";

@Injectable({ providedIn: 'root' })
export class ArticlesService {
    articles = signal<ArticleObject[]>([]);
    
    async getArticles() {
        const { error, data } = await supabase
            .from('articles')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (error) {
            console.error("Error getting articles from database", error.message);
            return;
        }

    
        this.articles.set(data as ArticleObject[]);
    };
}