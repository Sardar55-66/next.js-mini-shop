This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

Сделано:
- Реализовал визуал по фигме
- адаптировал под мобильные устройства и планшеты
- наполненил контентом отзывов из html обернутого в json
- наполненил контентом товары по апи
- показываю первую страницу сразу
- при нажатии на кнопку "купить", она меняется на кнопки + и - и поле для ввода кол-ва товара, значение -  1, кнопки добавляют т отбавляют товар, так же есть возможность вписать в поле для ввода любое кол-во.
- при изменении кол-ва какого-либо из товаров меняется информация в корзине (та что над полем с телефоном)
- набранные товары и введенный номер телефона сохраняются при перезагрузки страницы
- есть маска в поле для телефона
- при нажатии кнопки "заказать" идет проверка того что телефон полностью введен
    - если всё хорошо - отправляю запрос на сервер
    - если есть ошибки - подсвечиваю соответствующие поля красным (поле номера телефона)
- после отправки запроса и получения ответа от сервера отображаю попап что всё успешно
