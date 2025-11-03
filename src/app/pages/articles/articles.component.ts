import { Component, computed, signal } from '@angular/core';
import { ArticleObject } from '../interfaces/article-object.interface';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ArticleComponent } from './article/article.component';
import { HlmNumberedPagination } from '@spartan-ng/helm/pagination';

@Component({
  selector: 'app-articles',
  imports: [NavbarComponent, ArticleComponent, HlmNumberedPagination],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent {
  protected readonly _articles: ArticleObject[] = [
    {
      id: '1',
      title: 'Neue Kleidertausch-Party in Berlin!',
      date: '2025-11-05',
      author: 'Team KleidungTauschen',
      image: '/articleImg.jpg',
      summary:
        'Am kommenden Wochenende findet unsere größte Kleidertausch-Veranstaltung des Jahres in Berlin statt. Bring deine alten Lieblingsstücke mit und entdecke neue!',
      link: '/news/berlin-event',
      type: 'event',
    },
    {
      id: '2',
      title: 'Nachhaltigkeit im Alltag – Tipps von unserer Community',
      date: '2025-10-27',
      author: 'Team Event',
      image: '/articleImg.jpg',
      summary:
        'Wie kannst du deinen Kleiderschrank nachhaltiger gestalten? Unsere Community teilt ihre besten Tipps für bewussten Konsum und Second-Hand-Shopping.',
      link: '/news/sustainability-tips',
      type: 'story',
    },
    {
      id: '3',
      title: 'Kleidertausch jetzt auch in München verfügbar!',
      date: '2025-10-15',
      author: 'Team KleidungTauschen',
      image: '/articleImg.jpg',
      summary:
        'Gute Nachrichten für alle in Bayern – unser Kleidertausch-Projekt startet ab sofort auch in München. Registriere dich kostenlos und finde lokale Events.',
      link: '/news/munich-launch',
      type: 'announcement',
    },
    {
      id: '4',
      title: 'Tausch statt Kauf: Warum Sharing die Zukunft ist',
      date: '2025-09-30',
      author: 'Gastbeitrag von Anna Müller',
      image: '/articleImg.jpg',
      summary:
        'Im Gastartikel erklärt Anna, warum gemeinschaftliches Tauschen nicht nur Geld spart, sondern auch einen wichtigen Beitrag zum Umweltschutz leistet.',
      link: '/news/sharing-future',
      type: 'headline',
    },
    {
      id: '5',
      title: 'Tausch statt Kauf: Warum Sharing die Zukunft ist',
      date: '2025-09-30',
      author: 'Gastbeitrag von Anna Müller',
      image: '/articleImg.jpg',
      summary:
        'Im Gastartikel erklärt Anna, warum gemeinschaftliches Tauschen nicht nur Geld spart, sondern auch einen wichtigen Beitrag zum Umweltschutz leistet.',
      link: '/news/sharing-future',
      type: 'headline',
    },
    {
      id: '6',
      title: 'Tausch statt Kauf: Warum Sharing die Zukunft ist',
      date: '2025-09-30',
      author: 'Gastbeitrag von Anna Müller',
      image: '/articleImg.jpg',
      summary:
        'Im Gastartikel erklärt Anna, warum gemeinschaftliches Tauschen nicht nur Geld spart, sondern auch einen wichtigen Beitrag zum Umweltschutz leistet.',
      link: '/news/sharing-future',
      type: 'headline',
    },
    {
      id: '7',
      title: 'Tausch statt Kauf: Warum Sharing die Zukunft ist',
      date: '2025-09-30',
      author: 'Gastbeitrag von Anna Müller',
      image: '/articleImg.jpg',
      summary:
        'Im Gastartikel erklärt Anna, warum gemeinschaftliches Tauschen nicht nur Geld spart, sondern auch einen wichtigen Beitrag zum Umweltschutz leistet.',
      link: '/news/sharing-future',
      type: 'headline',
    },
    {
      id: '8',
      title: 'Tausch statt Kauf: Warum Sharing die Zukunft ist',
      date: '2025-09-30',
      author: 'Gastbeitrag von Anna Müller',
      image: '/articleImg.jpg',
      summary:
        'Im Gastartikel erklärt Anna, warum gemeinschaftliches Tauschen nicht nur Geld spart, sondern auch einen wichtigen Beitrag zum Umweltschutz leistet.',
      link: '/news/sharing-future',
      type: 'headline',
    },
    {
      id: '9',
      title: 'Tausch statt Kauf: Warum Sharing die Zukunft ist',
      date: '2025-09-30',
      author: 'Gastbeitrag von Anna Müller',
      image: '/articleImg.jpg',
      summary:
        'Im Gastartikel erklärt Anna, warum gemeinschaftliches Tauschen nicht nur Geld spart, sondern auch einen wichtigen Beitrag zum Umweltschutz leistet.',
      link: '/news/sharing-future',
      type: 'headline',
    },
  ];

  public readonly itemsPerPage = signal(5);
  public readonly currentPage = signal(1);
  public readonly pageSize = signal(
    Math.ceil(this._articles.length / this.itemsPerPage()),
  );
  public readonly totalArticles = signal(this._articles.length);

  public readonly paginatedArticles = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage();
    const end = start + this.itemsPerPage();
    return this._articles.slice(start, end);
  });
}
