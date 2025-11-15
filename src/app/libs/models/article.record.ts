export interface ArticleRecord {
  id: string;
  title: string;
  date: string;
  author: string;
  image: string;
  summary: string;
  link: string;
  type:
    | 'announcement'
    | 'headline'
    | 'event'
    | 'story'
    | 'blog'
    | 'interview'
    | 'guide';
}
