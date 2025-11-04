import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Mark } from '@core/models/mark.model';

@Injectable({ providedIn: 'root' })
export class MarkService {
  getLastMarks(): Observable<Mark[]> {
    const marks: Mark[] = [
      {
        id: 1,
        title: 'Mark @ Castelo de Guimarães',
        location: 'Guimarães, Portugal',
        image: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Steinhoggermerke_211_Nidaros.jpg'
      },
      {
        id: 2,
        title: 'Mark @ Mosteiro de Alcobaça',
        location: 'Alcobaça, Portugal',
        image: 'https://www.portugalresident.com/wp-content/uploads/2025/10/Silves-stone-marks-1416.jpg'
      },
      {
        id: 3,
        title: 'Mark @ Torre de Belém',
        location: 'Belém, Lisboa',
        image: 'https://www.champlainstone.com/wp-content/uploads/2019/01/Drill_Marks.jpg'
      },
      {
        id: 4,
        title: 'Mark @ Mosteiro dos Jerónimos',
        location: 'Lisboa, Portugal',
        image: 'https://live.staticflickr.com/5494/12092010223_fded9157f7_b.jpg'
      },
      {
        id: 5,
        title: 'Mark @ Mosteiro da Batalha',
        location: 'Batalha, Portugal',
        image: 'https://www.portugalresident.com/wp-content/uploads/2025/10/Silves-stone-marks-1540.jpg'
      },
      {
        id: 6,
        title: 'Mark @ Convento de Cristo',
        location: 'Tomar, Portugal',
        image: 'https://per-storemyr.net/wp-content/uploads/2015/05/harrell-storemyr_fig-10_op.jpg'
      }
    ];

    return of(marks);
  }
}
