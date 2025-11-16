import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Mark } from '@core/models/mark.model';
import { MarkCategory } from '@core/enums/mark.category';
import { MarkShape } from '@core/enums/mark.shape';

@Injectable({ providedIn: 'root' })
export class MarkService {

  private marksData: Mark[] = [
    {
      id: 1,
      title: 'Mason\'s Mark - Cross Pattern',
      location: 'Guimarães, Portugal',
      cover: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Steinhoggermerke_211_Nidaros.jpg',
      description: 'This distinctive mason\'s mark was discovered on the northern wall of the Castelo de Guimarães. The cross pattern, characteristic of medieval stonemasons, likely represents the signature of a master craftsman who worked on the castle\'s construction during the 12th century. The mark shows exceptional preservation, with clear chisel marks still visible around its edges.',
      category: MarkCategory.TRADE,
      shape: MarkShape.CROSS,
      monument: {
        name: 'Castelo de Guimarães',
        location: 'Guimarães, Portugal',
        period: '10th - 12th Century'
      },
      discoveredBy: 'João Silva',
      discoveredDate: 'March 15, 2024',
      views: 1247,
      bookmarks: 89,
      monumentId: 1
    },
    {
      id: 2,
      title: 'Circular Religious Symbol',
      location: 'Alcobaça, Portugal',
      cover: 'https://www.portugalresident.com/wp-content/uploads/2025/10/Silves-stone-marks-1416.jpg',
      description: 'A remarkable circular mark found in the Mosteiro de Alcobaça, believed to be a religious symbol used by Cistercian monks during the monastery\'s construction in the 12th century. The perfect symmetry and smooth execution suggest it was carved by a highly skilled craftsman with deep religious significance.',
      category: MarkCategory.RELIGIOUS,
      shape: MarkShape.CIRCLE,
      monument: {
        name: 'Mosteiro de Alcobaça',
        location: 'Alcobaça, Portugal',
        period: '12th Century'
      },
      discoveredBy: 'Maria Santos',
      discoveredDate: 'January 22, 2024',
      views: 892,
      bookmarks: 67,
      monumentId: 2
    },
    {
      id: 3,
      title: 'Star Pattern - Maritime Mark',
      location: 'Belém, Lisboa',
      cover: 'https://www.champlainstone.com/wp-content/uploads/2019/01/Drill_Marks.jpg',
      description: 'An intricate star-shaped mark discovered at the Torre de Belém, likely related to maritime navigation symbols used during the Age of Discovery. The eight-pointed star may represent the compass rose, a crucial tool for Portuguese navigators of the 16th century.',
      category: MarkCategory.GEOMETRIC,
      shape: MarkShape.STAR,
      monument: {
        name: 'Torre de Belém',
        location: 'Belém, Lisboa',
        period: '16th Century'
      },
      discoveredBy: 'Pedro Costa',
      discoveredDate: 'February 10, 2024',
      views: 1534,
      bookmarks: 142,
      monumentId: 3
    },
    {
      id: 4,
      title: 'Heraldic Shield Mark',
      location: 'Lisboa, Portugal',
      cover: 'https://live.staticflickr.com/5494/12092010223_fded9157f7_b.jpg',
      description: 'A sophisticated heraldic mark found in the Mosteiro dos Jerónimos, featuring what appears to be a simplified coat of arms. This type of mark was often used by noble patrons or master craftsmen of high social standing during the Manueline period.',
      category: MarkCategory.HERALDIC,
      shape: MarkShape.SYMBOL,
      monument: {
        name: 'Mosteiro dos Jerónimos',
        location: 'Lisboa, Portugal',
        period: '16th Century'
      },
      discoveredBy: 'Ana Rodrigues',
      discoveredDate: 'April 5, 2024',
      views: 2103,
      bookmarks: 198,
      monumentId: 4
    },
    {
      id: 5,
      title: 'Triangular Masonic Symbol',
      location: 'Batalha, Portugal',
      cover: 'https://www.portugalresident.com/wp-content/uploads/2025/10/Silves-stone-marks-1540.jpg',
      description: 'An enigmatic triangular mark discovered at the Mosteiro da Batalha, potentially linked to masonic traditions. The precise angles and depth of carving suggest advanced geometric knowledge and professional craftsmanship of the Gothic period.',
      category: MarkCategory.MASONIC,
      shape: MarkShape.TRIANGLE,
      monument: {
        name: 'Mosteiro da Batalha',
        location: 'Batalha, Portugal',
        period: '14th - 15th Century'
      },
      discoveredBy: 'Carlos Almeida',
      discoveredDate: 'May 18, 2024',
      views: 765,
      bookmarks: 54,
      monumentId: 5
    },
    {
      id: 6,
      title: 'Letter Mark - Master Signature',
      location: 'Tomar, Portugal',
      cover: 'https://per-storemyr.net/wp-content/uploads/2015/05/harrell-storemyr_fig-10_op.jpg',
      description: 'A distinctive letter-based mark found at the Convento de Cristo in Tomar. This type of alphabetic signature was commonly used by master masons to identify their work and maintain quality standards. The letter appears to be a stylized "T", possibly representing the craftsman\'s name or guild.',
      category: MarkCategory.TRADE,
      shape: MarkShape.LETTER,
      monument: {
        name: 'Convento de Cristo',
        location: 'Tomar, Portugal',
        period: '12th - 16th Century'
      },
      discoveredBy: 'Teresa Fernandes',
      discoveredDate: 'June 30, 2024',
      views: 1089,
      bookmarks: 95,
      monumentId: 6
    }
  ];

  getLastMarks(){
    return of(this.marksData.slice(0, 6));
  }

  getMarkById(id: number): Observable<Mark | undefined> {
    const mark = this.marksData.find(m => m.id === id);
    return of(mark);
  }
}
