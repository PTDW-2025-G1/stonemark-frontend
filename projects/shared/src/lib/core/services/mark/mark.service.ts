import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Mark } from '@core/models/mark.model';
import { MarkOccurrence } from '@core/models/mark.occurence.model'
import { MarkCategory } from '@core/enums/mark.category';
import { MarkShape } from '@core/enums/mark.shape';

@Injectable({ providedIn: 'root' })
export class MarkService {

  private marksData: Mark[] = [
    {
      id: 1,
      title: 'Mason\'s Mark - Cross Pattern',
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
      occurences: 5,
      bookmarks: 89,
      monumentId: 1
    },
    {
      id: 2,
      title: 'Circular Religious Symbol',
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
      occurences: 3,
      bookmarks: 67,
      monumentId: 2
    },
    {
      id: 3,
      title: 'Star Pattern - Maritime Mark',
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
      occurences: 4,
      bookmarks: 142,
      monumentId: 3
    },
    {
      id: 4,
      title: 'Heraldic Shield Mark',
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
      occurences: 2,
      bookmarks: 198,
      monumentId: 4
    },
    {
      id: 5,
      title: 'Triangular Masonic Symbol',
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
      occurences: 6,
      bookmarks: 54,
      monumentId: 5
    },
    {
      id: 6,
      title: 'Letter Mark - Master Signature',
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
      occurences: 3,
      bookmarks: 95,
      monumentId: 6
    }
  ];

  private occurrencesData: MarkOccurrence[] = [
    {
      id: 101,
      markId: 1,
      cover: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Steinhoggermerke_211_Nidaros.jpg',
      title: 'Northern Wall - Main Entrance',
      location: 'Castelo de Guimarães, Portugal',
      monumentId: 1,
      monumentName: 'Castelo de Guimarães',
      discoveredBy: 'João Silva',
      discoveredDate: 'March 15, 2024',
      description: 'Found on the northern wall near the main entrance, at approximately 2.5 meters height.',
      latitude: 41.448249,
      longitude: -8.290090
    },
    {
      id: 102,
      markId: 1,
      cover: 'https://per-storemyr.net/wp-content/uploads/2015/05/harrell-storemyr_fig-10_op.jpg',
      title: 'Tower Section - East Side',
      location: 'Castelo de Guimarães, Portugal',
      monumentId: 1,
      monumentName: 'Castelo de Guimarães',
      discoveredBy: 'Maria Santos',
      discoveredDate: 'March 20, 2024',
      description: 'Located on the eastern tower section, this occurrence shows similar characteristics to the main mark.',
      latitude: 41.448350,
      longitude: -8.290200
    },
    {
      id: 103,
      markId: 1,
      cover: 'https://www.champlainstone.com/wp-content/uploads/2019/01/Drill_Marks.jpg',
      title: 'Inner Courtyard Wall',
      location: 'Castelo de Guimarães, Portugal',
      monumentId: 1,
      monumentName: 'Castelo de Guimarães',
      discoveredBy: 'Pedro Costa',
      discoveredDate: 'April 2, 2024',
      description: 'Found in the inner courtyard, suggesting the same mason worked on multiple sections.',
      latitude: 41.448150,
      longitude: -8.289980
    },
    {
      id: 104,
      markId: 1,
      cover: 'https://live.staticflickr.com/5494/12092010223_fded9157f7_b.jpg',
      title: 'Chapel Wall - South Wing',
      location: 'Mosteiro dos Jerónimos, Portugal',
      monumentId: 4,
      monumentName: 'Mosteiro dos Jerónimos',
      discoveredBy: 'Ana Rodrigues',
      discoveredDate: 'April 15, 2024',
      description: 'Similar mark found in Mosteiro dos Jerónimos, indicating possible mason migration between projects.',
      latitude: 38.697778,
      longitude: -9.206111
    },
    {
      id: 105,
      markId: 1,
      cover: 'https://www.portugalresident.com/wp-content/uploads/2025/10/Silves-stone-marks-1540.jpg',
      title: 'Cloister Column Base',
      location: 'Mosteiro da Batalha, Portugal',
      monumentId: 5,
      monumentName: 'Mosteiro da Batalha',
      discoveredBy: 'Carlos Almeida',
      discoveredDate: 'May 3, 2024',
      description: 'Another occurrence found at Mosteiro da Batalha, further confirming the mason\'s extensive work.',
      latitude: 39.660556,
      longitude: -8.825556
    },
    {
      id: 201,
      markId: 2,
      cover: 'https://www.portugalresident.com/wp-content/uploads/2025/10/Silves-stone-marks-1416.jpg',
      title: 'Main Cloister - North Gallery',
      location: 'Mosteiro de Alcobaça, Portugal',
      monumentId: 2,
      monumentName: 'Mosteiro de Alcobaça',
      discoveredBy: 'Maria Santos',
      discoveredDate: 'January 22, 2024',
      description: 'Primary occurrence in the main cloister, showcasing exceptional preservation.',
      latitude: 39.548889,
      longitude: -8.980000
    },
    {
      id: 202,
      markId: 2,
      cover: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Steinhoggermerke_211_Nidaros.jpg',
      title: 'Refectory Wall',
      location: 'Mosteiro de Alcobaça, Portugal',
      monumentId: 2,
      monumentName: 'Mosteiro de Alcobaça',
      discoveredBy: 'João Silva',
      discoveredDate: 'February 5, 2024',
      description: 'Secondary occurrence found in the monastery refectory.',
      latitude: 39.548750,
      longitude: -8.980150
    },
    {
      id: 203,
      markId: 2,
      cover: 'https://per-storemyr.net/wp-content/uploads/2015/05/harrell-storemyr_fig-10_op.jpg',
      title: 'Chapter House Entrance',
      location: 'Mosteiro de Alcobaça, Portugal',
      monumentId: 2,
      monumentName: 'Mosteiro de Alcobaça',
      discoveredBy: 'Teresa Fernandes',
      discoveredDate: 'February 18, 2024',
      description: 'Located at the entrance of the chapter house, indicating ceremonial significance.',
      latitude: 39.548950,
      longitude: -8.979850
    }
  ];

  getLastMarks(): Observable<Mark[]> {
    return of(this.marksData.slice(0, 6));
  }

  getMarkById(id: number): Observable<Mark | undefined> {
    const mark = this.marksData.find(m => m.id === id);
    return of(mark);
  }

  getOccurrencesByMarkId(markId: number): Observable<MarkOccurrence[]> {
    const occurrences = this.occurrencesData.filter(occ => occ.markId === markId);
    return of(occurrences);
  }
}
