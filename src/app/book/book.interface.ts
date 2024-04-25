export interface IBook {
  id: string;
  name: string;
  whyRead: string;
  chapters: IChapter[];
}

export interface IChapter {
  id: string;
  bookId: string;
  title: string;
  what: string;
  how: string;
  whyRead: string;
}

// TODO: remove
// TODO: more detail about "art of programming"
// Additional mock data for IBook and IChapter interfaces
// Mock data for updated IBook and IChapter interfaces
const book: IBook = {
  id: "987654",
  name: "The Art of Storytelling",
  whyRead: "This book provides insights into crafting compelling narratives and engaging stories.",
  chapters: [
    {
      id: '1',
      bookId: '987654',
      title: "Chapter 1: Introduction to Storytelling",
      what: "Introduces storytelling as a powerful communication tool.",
      how: "Explains storytelling techniques such as character development and plot structure.",
      whyRead: "Learn the art of captivating your audience through storytelling.",
    },
    {
      id: '2',
      bookId: '987654',
      title: "Chapter 2: Narrative Elements",
      what: "Explores key elements of narratives such as setting, conflict, and resolution.",
      how: "Provides examples and exercises to develop strong narrative skills.",
      whyRead: "Master the craft of creating immersive and impactful stories.",
    },
    {
      id: '3',
      bookId: '987654',
      title: "Chapter 3: Emotional Impact",
      what: "Examines how emotions influence storytelling and audience engagement.",
      how: "Teaches strategies for evoking emotions and creating memorable experiences.",
      whyRead: "Discover how to connect emotionally with your audience through storytelling.",
    },
    {
      id: '4',
      bookId: '987654',
      title: "Chapter 4: Storytelling in Business",
      what: "Explores the use of storytelling in marketing, presentations, and branding.",
      how: "Demonstrates how storytelling can enhance communication and influence decisions.",
      whyRead: "Unlock the potential of storytelling to drive business success.",
    },
    // Add more chapters as needed
  ],
};

// Mock data for "Art of Programming" book
const programmingBook: IBook = {
  id: "123456",
  name: "The Art of Programming",
  whyRead: "This book offers a comprehensive guide to mastering programming concepts and techniques.",
  chapters: [
    {
      id: '5',
      bookId: '123456',
      title: "Chapter 1: Introduction to Programming",
      what: "Introduces fundamental programming concepts and terminology.",
      how: "Provides examples and exercises to practice programming basics.",
      whyRead: "Start your journey to becoming a skilled programmer with a strong foundation.",
    },
    {
      id: '6',
      bookId: '123456',
      title: "Chapter 2: Data Structures and Algorithms",
      what: "Covers essential data structures like arrays, lists, and trees, and algorithms such as sorting and searching.",
      how: "Explains implementation and optimization techniques for data structures and algorithms.",
      whyRead: "Master data handling and algorithmic problem-solving skills crucial for software development.",
    },
    {
      id: '7',
      bookId: '123456',
      title: "Chapter 3: Object-Oriented Programming (OOP)",
      what: "Dives deep into OOP principles including classes, objects, inheritance, and polymorphism.",
      how: "Demonstrates best practices and design patterns for building modular and maintainable code.",
      whyRead: "Learn advanced programming concepts and techniques used in modern software development.",
    },
    {
      id: '8',
      bookId: '123456',
      title: "Chapter 4: Web Development Basics",
      what: "Introduces web development technologies such as HTML, CSS, and JavaScript.",
      how: "Guides you through building simple web applications and understanding client-server architecture.",
      whyRead: "Explore the exciting world of web development and create dynamic, interactive websites.",
    },
    // Add more chapters as needed
  ],
};

export const books: IBook[] = [
  { ...book },
  { ...programmingBook },
]
