import { Component, computed, signal } from '@angular/core';
import { ArticleObject } from '../../libs/models/article-object.interface';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ArticleComponent } from '../components/article/article.component';
import { HlmNumberedPagination } from '@spartan-ng/helm/pagination';

@Component({
  selector: 'app-articles',
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
export default class ArticlesPageComponent {
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
      author: 'Team KleidungTauschen',
      image: '/articleImg.jpg',
      summary:
        'Die Modebranche ist einer der größten Umweltverschmutzer weltweit. Warum das Teilen von Kleidung nicht nur nachhaltig, sondern auch wirtschaftlich sinnvoll ist.',
      link: '/news/sharing-economy',
      type: 'blog',
    },
    {
      id: '5',
      title: 'Interview: "Mode ohne Müll" – ein Gespräch mit Anna Meier',
      date: '2025-09-15',
      author: 'Team Event',
      image: '/articleImg.jpg',
      summary:
        'Anna Meier, Mode-Aktivistin und Gründerin der Zero-Waste-Initiative, spricht über nachhaltige Mode und ihre Vision einer müllfreien Zukunft.',
      link: '/news/interview-anna',
      type: 'interview',
    },
    {
      id: '6',
      title: 'Top 5 Tipps für deinen ersten Kleidertausch',
      date: '2025-08-20',
      author: 'Team KleidungTauschen',
      image: '/articleImg.jpg',
      summary:
        'Du möchtest zum ersten Mal an einem Kleidertausch teilnehmen? Wir verraten dir, wie du das Beste aus deinem ersten Event herausholst.',
      link: '/news/first-swap-tips',
      type: 'guide',
    },
    {
      id: '7',
      title: 'Erfolgsgeschichte: Wie Lisa durch Tauschen 1.000€ sparte',
      date: '2025-08-05',
      author: 'Team Event',
      image: '/articleImg.jpg',
      summary:
        'Lisa hat in den letzten sechs Monaten mehr als 50 Kleidungsstücke getauscht und dabei über 1.000 Euro gespart. Hier ist ihre Geschichte.',
      link: '/news/lisa-success',
      type: 'story',
    },
    {
      id: '8',
      title: 'Neues Feature: Digitale Kleiderschrankorganisation',
      date: '2025-07-18',
      author: 'Team KleidungTauschen',
      image: '/articleImg.jpg',
      summary:
        'Mit unserem neuen Feature kannst du deinen Kleiderschrank digital verwalten und effizienter planen, was du tauschen möchtest.',
      link: '/news/digital-wardrobe',
      type: 'announcement',
    },
    {
      id: '9',
      title: 'Veranstaltungsbericht: Kleidertausch-Festival 2025',
      date: '2025-07-01',
      author: 'Team Event',
      image: '/articleImg.jpg',
      summary:
        'Unser jährliches Kleidertausch-Festival war ein voller Erfolg! Mehr als 500 Teilnehmer tauschten über 2.000 Kleidungsstücke.',
      link: '/news/festival-2025',
      type: 'event',
    },
    {
      id: '10',
      title: 'Partnerschaften: Neue Kooperationen mit lokalen Modegeschäften',
      date: '2025-06-15',
      author: 'Team KleidungTauschen',
      image: '/articleImg.jpg',
      summary:
        'Wir freuen uns, unsere neuen Partnerschaften mit lokalen Modegeschäften bekanntzugeben, die nachhaltige Mode fördern.',
      link: '/news/partnerships',
      type: 'announcement',
    },
  ];

  currentPage = signal<number>(1);
  itemsPerPage = signal<number>(5);

  totalArticles = computed(() => this._articles.length);

  paginatedArticles = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage();
    const end = start + this.itemsPerPage();
    return this._articles.slice(start, end);
  });
}
