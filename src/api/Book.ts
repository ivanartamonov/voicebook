import {Book, Tag} from '../types/types.ts';

export const findBooks = (): Array<Book> => {
  return [
    {
      id: '1',
      title: 'Заборонена для мажора',
      cover: 'https://st.booknet.ua/uploads/covers/220/1695712337_4.png',
      author: {
        id: '1',
        name: 'Альма Лібрем',
        avatar:
          'https://st.booknet.ua/uploads/user_avatars_new/160/1538814464_1165962.jpg',
      },
      genre: 'Романтика',
      tags: generateFakeTags(4),
      likes: 165,
    },
    {
      id: '2',
      title: 'За власним бажанням',
      cover: 'https://st.booknet.ua/uploads/covers/220/1708788896_26.jpg',
      author: {
        id: '2',
        name: 'Соломія Даймонд',
        avatar:
          'https://st.booknet.ua/uploads/user_avatars_new/160/1707299259_4843192.jpg',
      },
      genre: 'Фентезі',
      tags: generateFakeTags(4),
      likes: 12,
    },
    {
      id: '3',
      title: 'Час пробачати',
      cover: 'https://st.booknet.ua/uploads/covers/220/1697796419_56.jpg',
      author: {
        id: '3',
        name: 'Анні Кос',
        avatar:
          'https://st.booknet.ua/uploads/user_avatars_new/160/1675773765_8955513.jpeg',
      },
      genre: 'Детектив',
      tags: generateFakeTags(4),
      likes: 1267,
    },
    {
      id: '4',
      title: "П'янкий смак кохання",
      cover: 'https://st.booknet.ua/uploads/covers/220/1673221872_64.jpg',
      author: {
        id: '4',
        name: 'Кіра Шарм',
        avatar:
          'https://st.booknet.ua/uploads/user_avatars_new/160/1647879995_3431092.png',
      },
      genre: 'Романтика',
      tags: generateFakeTags(4),
      likes: 765,
    },
    {
      id: '5',
      title: 'Залишся єдиним',
      cover: 'https://st.booknet.ua/uploads/covers/220/1658075318_26.jpeg',
      author: {
        id: '5',
        name: 'Олена Сашина',
        avatar:
          'https://st.booknet.ua/uploads/user_avatars_new/160/1700567182_10876149.jpg',
      },
      genre: 'Фентезі',
      tags: generateFakeTags(4),
      likes: 576,
    },
  ];
};

function generateFakeTags(num: number): Array<Tag> {
  const tags = [
    'Владний герой',
    'Любовний трикутник',
    'Службовий роман',
    'Заборонене кохання',
    'Родинні таємниці',
    'Таємниці',
    'Академія магії',
    'Пригоди',
    'Обертні',
    'Бос та підлегла',
    'Кохання',
    'Сильна героїня',
    'Дракони',
    'Протистояння характерів',
  ];

  // shuffle tags and return first num elements
  return tags
    .sort(() => Math.random() - 0.5)
    .slice(0, num)
    .map((tag, index) => ({
      id: index.toString(),
      name: tag,
    }));
}
