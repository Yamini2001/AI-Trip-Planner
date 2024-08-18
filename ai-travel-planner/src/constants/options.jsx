export const selectTravelList=[
    {
        id: 1,
        title: 'Just Me',
        desc:'A sole traveles in exploration',
        icons:'✈️',
        people:'1 People'
    },
    {
        id: 2,
        title: 'A Couple',
        desc:'Two traveles in tandem',
        icons:'👫',
        people:'2 People'
    },
    {
        id: 3,
        title: 'Family',
        desc:'A group of fun loving adv',
        icons:'👨‍👩‍👧‍👦',
        people:'3 to 5 People'
    },
    {
        id: 4,
        title: 'Friends',
        desc:'A bunch of thrill-seekers',
        icons:'👫👬👭👩‍👩‍👦',
        people:'5 to 10 People'
    },


]
export const SelectBudgetOptions=[
    {
        id: 1,
        title: 'Cheap',
        desc:'Stay conscious of costs',
        icons:'💸',
    },
    {
        id: 2,
        title: 'Moderate',
        desc:'Keep cost on the average side',
        icons:'💵',
    },
    {
        id: 1,
        title: 'Luxury',
        desc:'Dont worry about cost',
        icons:'💎',
    },

]
export const AI_PROMPT='Genrate Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget, give me the Hotels options list  with HotelName,Hotel address ,Price ,hotel image url,geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details , Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for {Days} days with each day plan with best time to visit in JSON format.'