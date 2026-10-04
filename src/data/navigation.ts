export interface ChapterSection {
  id: string;
  label: string;
}

export interface Chapter {
  title: string;
  badge: string;
  sections: ChapterSection[];
}

export const chapters: Chapter[] = [
  {
    title: 'On Existence',
    badge: 'I / V',
    sections: [
      { id: 's1', label: 'The Program' },
      { id: 's2', label: 'Fine-Tuning' },
      { id: 's3', label: 'Random Ranges' },
      { id: 's4', label: 'Anthropic' },
      { id: 's5', label: 'Before t = 0' },
      { id: 's6', label: 'Causality' },
      { id: 's7', label: 'Logic' },
      { id: 's8', label: 'The Fork' },
      { id: 's9', label: 'Conclusion' },
    ],
  },
  {
    title: 'On Reason',
    badge: 'II / V',
    sections: [
      { id: 's10', label: 'Two Forms of PSR' },
      { id: 's11', label: 'The Exception' },
      { id: 's12', label: 'Self-Undermining' },
      { id: 's13', label: 'Dark Matter' },
      { id: 's14', label: 'Intelligibility' },
      { id: 's15', label: 'Strong PSR' },
    ],
  },
  {
    title: 'On God',
    badge: 'III / V',
    sections: [
      { id: 's16', label: 'Cause to Being' },
      { id: 's17', label: 'Being to Intelligent' },
      { id: 's18', label: 'Intelligent to Wise' },
      { id: 's19', label: 'Wise to Good' },
      { id: 's20', label: 'Good to Personal' },
    ],
  },
  {
    title: 'On Revelation',
    badge: 'IV / V',
    sections: [
      { id: 's21', label: 'Limits of Reason' },
      { id: 's22', label: 'Communication' },
      { id: 's23', label: 'A Method' },
      { id: 's24', label: 'Mechanism' },
      { id: 's25', label: 'Applying It' },
      { id: 's26', label: 'Summary' },
    ],
  },
  {
    title: 'On Religions',
    badge: 'V / V',
    sections: [
      { id: 's27', label: 'The Method' },
      { id: 's28', label: 'Non-Monotheistic' },
      { id: 's29', label: 'Judaism' },
      { id: 's30', label: 'Trinity & Incarnation' },
      { id: 's31', label: 'Preservation' },
      { id: 's32', label: 'Original Sin' },
      { id: 's33', label: 'Secular Positions' },
      { id: 's34', label: 'What Survives' },
      { id: 's35', label: 'What This Proves' },
    ],
  },
];

export const allSectionsFlat = chapters.flatMap((ch, ci) =>
  ch.sections.map((s, si) => ({ ...s, chapterIndex: ci, sectionIndex: si })),
);
