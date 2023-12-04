export const data = [
  {
    trip: {
      id: 1,

      info: {
        city: "Barcelona",
        country: "Spain",
        population: 1600000,
        language: "Spanish and Catalan",
        startDate: new Date(
          "Thu Nov 24 2023 10:00:00 GMT-0300 (Brasilia Standard Time)"
        ),
        endDate: new Date(
          "Thu Nov 27 2023 19:00:00 GMT-0300 (Brasilia Standard Time)"
        ),
      },

      itinerary: [
        {
          id: 1,
          date: new Date("2023-11-24"),

          events: [
            {
              id: 101,
              time: "9:00",
              title: "El Prat Airport",
              description:
                "Flight Iberia 8874 from Rio de Janeiro to Barcelona",
              image: "bg-elprat",
              cost: "",
              attachment: "",
              website: "",
            },
            {
              id: 102,
              time: "",
              title: "Generator Hotel",
              description: "Check-in starts at 12:00",
              image: "bg-generator",
              cost: "",
              attachment: "",
              website: "",
            },
          ],
        },
        {
          id: 2,
          date: new Date("2023-11-25"),

          events: [
            {
              id: 201,
              time: "10:00",
              title: "Parc Guell",
              description: "Famous parc by Antony Gaudí.",
              image: "bg-guell",
              cost: "25,00",
              attachment: "ticket.png",
              website: "",
            },
            {
              id: 202,
              time: "",
              title: "Congracia Restaurant",
              description: "Nice place to lunch close to Parc Guell",
              image: "bg-congracia",
              cost: "",
              attachment: "",
              website: "",
            },
          ],
        },
        {
          id: 3,
          date: new Date("2023-11-26"),

          events: [
            {
              id: 301,
              time: "11:00",
              title: "Sagrada Familia",
              description: "Famous church by Antony Gaudí.",
              image: "bg-sagrada",
              cost: "26,00",
              attachment: "ticket.png",
              website: "",
            },
          ],
        },
        {
          id: 4,
          date: new Date("2023-11-27"),

          events: [],
        },
      ],

      budget: {
        limit: 2000,
        expenses: [
          {
            id: "1000",
            date: new Date(
              "Thu Nov 25 2023 10:00:00 GMT-0300 (Brasilia Standard Time)"
            ),
            value: 10.0,
            name: "Breakfast at Bormuth",
            type: "Food",
          },
          {
            id: "1001",
            date: new Date(
              "Thu Nov 25 2023 14:00:00 GMT-0300 (Brasilia Standard Time)"
            ),
            value: 15.0,
            name: "Picasso Museum Ticket",
            type: "Activities",
          },
          {
            id: "1002",
            date: new Date(
              "Thu Nov 25 2023 19:00:00 GMT-0300 (Brasilia Standard Time)"
            ),
            value: 12.5,
            name: "Dinner at Kiosko",
            type: "Food",
          },
          {
            id: "1003",
            date: new Date(
              "Thu Nov 26 2023 11:00:00 GMT-0300 (Brasilia Standard Time)"
            ),
            value: 39.95,
            name: "Shopping at Jules",
            type: "Food",
          },
        ],
      },

      lists: [
        {
          id: 100,
          title: "Restaurants",
          items: [
            {
              id: 111,
              name: "Bacoa",
              rating: 4.4,
              price: "$$",
              type: "Hamburgueria",
              address: "Ronda de la Univ., 31, 08007 Barcelona, Spain",
              website: "www.bacoaburger.com",
              image: "bg-bacoa",
            },
            {
              id: 112,
              name: "Koku Kitchen",
              rating: 4.4,
              price: "$$",
              type: "Japanese",
              address: "C/ del Comerç, 29, 08003 Barcelona, Spain",
              website: "www.kokukitchen.es",
              image: "bg-koku",
            },
            {
              id: 113,
              name: "100 Montaditos",
              rating: 4.0,
              price: "$",
              type: "Petiscaria",
              address: "Rambla del Raval, 41, 08001 Barcelona, Espanha",
              website: "spain.100montaditos.com",
              image: "bg-montaditos",
            },
          ],
        },
        {
          id: 200,
          title: "Museums",
          items: [
            {
              id: 211,
              name: "MACBA",
              rating: 4.3,
              price: "",
              type: "Contemporary",
              address: "Plaça dels Àngels, 1, 08001 Barcelona, Espanha",
              website: "www.macba.cat/",
              image: "bg-macba",
            },
          ],
        },
      ],
      notes: {
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo natus nam ipsam eaque cumque laudantium quae id, dolorum nisi aiste omnis quidem impedit possimus, ab earum debitis. Repellatearum accusamus amet debitis totam facilis nulla, reiciendisautem incidunt numquam cum praesentium odio neque excepturi!Similique consectetur aut sint pariatur. Lorem ipsum dolor sitamet consectetur adipisicing elit. Quo natus nam ipsam eaquecumque laudantium quae id, dolorum nisi a iste omnis quidemimpedit possimus, ab earum debitis. Repellat earum accusamusamet debitis totam facilis nulla, reiciendis autem inciduntnumquam cum praesentium odio neque excepturi! Similiqueconsectetur aut sint pariatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo natus nam ipsam eaque cumque laudantium quae id, dolorum nisi aiste omnis quidem impedit possimus, ab earum debitis. Repellatearum accusamus amet debitis totam facilis nulla, reiciendisautem incidunt numquam cum praesentium odio neque excepturi!Similique consectetur aut sint pariatur. Lorem ipsum dolor sitamet consectetur adipisicing elit. Quo natus nam ipsam eaquecumque laudantium quae id, dolorum nisi a iste omnis quidemimpedit possimus, ab earum debitis. Repellat earum accusamusamet debitis totam facilis nulla, reiciendis autem inciduntnumquam cum praesentium odio neque excepturi! Similiqueconsectetur aut sint pariatur.",
      },
    },
  },
];
