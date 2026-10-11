export const categories = [
  { id: "superhero", category: "Superhero Movies", search: "Batman" },
  { id: "space", category: "Space Movies", search: "Space" },
  { id: "romance", category: "Love Stories", search: "Love" },
  { id: "horror", category: "Horror Titles", search: "Horror" },
  { id: "adventure", category: "Adventure Titles", search: "Adventure" },
  { id: "christmas", category: "Christmas Movies", search: "Christmas" },
  { id: "war", category: "War Movies", search: "War" },
  { id: "zombie", category: "Zombie Movies", search: "Zombie" },
  { id: "vampire", category: "Vampire Movies", search: "Vampire" },
  { id: "detective", category: "Detective Stories", search: "Detective" },
  { id: "dinosaur", category: "Dinosaur Movies", search: "Dinosaur" },
  { id: "robot", category: "Robot Movies", search: "Robot" },
  { id: "alien", category: "Alien Movies", search: "Alien" },
  { id: "pirate", category: "Pirate Movies", search: "Pirate" },
  {
    id: "harry-potter",
    category: "Harry Potter Collection",
    search: "Harry Potter",
  },
];

export const sections = categories.map((category) => ({
  key: category.id,
  title: category.category,
  data: [category],
}));
