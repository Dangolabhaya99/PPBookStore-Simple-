import React from 'react';
import BookComponent from './BookComponent';

const BookDetail = () => {
    const BookData = [
        {
            imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFVBP5QPStr34_5FMUZFkHQ7FyNC86HyJlZw&usqp=CAU",
            Title: "Organic Chemistry",
            Description: "Foundation of Computational Mathematics",
            Publication: "Samjhana",
            Price: 2000
            
        },
        {
            imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkAlUUaO49AKAQBGb6u3IP1sa_n7O0nh5VeA&usqp=CAU",
            Title: "Basic Mathematics",
            Description: "Foundation of Computational Mathematics",
            Publication: "ReadMore",
            Price: 2000
        },
        {
            imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrZbF1eWIH-hizf8EgSchh1DfqRO3kHbJQCg&usqp=CAU",
            Title: "Simplified Physics",
            Description: "Foundation of Computational Mathematics",
            Publication: "GoodWill",
            Price: 2000
        },
        {
            imgUrl: "https://nirvanapublication.com/wp-content/uploads/2019/05/bio-300x375.jpg",
            Title: "Biology Refresher",
            Description: "Foundation of Computational Mathematics",
            Publication: "ReadMore",
            Price: 2000
        },
        {
            imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjtvU_Zal8xc7_dYL45d1_uG8_E5HoX6jDuw&usqp=CAU",
            Title: "Applied Chemistry",
            Description: "Foundation of Computational Mathematics",
            Publication: "Samjhana",
            Price: 2000
        },
        {
            imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTmAdiYr2MOXmMrvKcNHoWC9hmZaIcjL-Zbg&usqp=CAU",
            Title: "English",
            Description: "Foundation of Oxford",
            Publication: "Oxford",
            Price: 2000
        },
        {
            imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4-Zs44mhd6qAGYkf1enUkRsx9dJ4uL64ZPQ&usqp=CAU",
            Title: "English",
            Description: "Foundation of Computational Mathematics",
            Publication: "Samjhana",
            Price: 2000
        },
        {
            imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0q5YWax6byReo9Z3AjJD5eBSt5GOdqmQ9MllqJISnt4EVu-ycb4Zg3FRJDmUYhVJnUGA&usqp=CAU",
            Title: "Accounting",
            Description: "Principles of accounting",
            Publication: "Samjhana",
            Price: 2000
        },
    ];

    return (
        <div>
            <BookComponent data={BookData}/>
        </div>
    );
};

export default BookDetail;
