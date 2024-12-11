import { useState } from 'react';
import { Search, Cake, Heart, Gift, Sparkles, Music, Utensils, GraduationCap } from 'lucide-react';
import Navbar from '../../components/user/navbar/navbar';
import { Helmet } from "react-helmet";
import Footer from '../../components/user/footer/footer';

const occasions = [
  { id: 1, title: 'Birthdays', Icon: Cake, image: 'https://static.vecteezy.com/system/resources/previews/022/527/544/non_2x/birthday-party-balloon-background-illustration-ai-generative-free-photo.jpg' },
  { id: 2, title: 'Weddings', Icon: Heart, image: 'https://static.vecteezy.com/system/resources/thumbnails/027/718/473/small_2x/wedding-couple-in-love-in-flower-arch-generative-ai-photo.jpg' },
  { id: 3, title: 'Holidays', Icon: Gift, image: 'https://www.deburghgroup.com/wp-content/uploads/2017/09/Summer-Holiday.jpg' },
  { id: 4, title: 'Anniversaries', Icon: Sparkles, image: 'https://img.freepik.com/free-photo/medium-shot-old-people-hugging_23-2150976980.jpg' },
  { id: 5, title: 'Parties', Icon: Music, image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?cs=srgb&dl=pexels-wendywei-1190298.jpg&fm=jpg' },
  { id: 6, title: 'Dinner Events', Icon: Utensils, image: 'https://media.istockphoto.com/id/1311487470/photo/decorated-banquet-with-salads.jpg?s=612x612&w=0&k=20&c=Z6yOsYRIXn463T8YXXPZ9pfKaPrBO89JwDxMpPd9vZc=' },
  { id: 7, title: 'Graduations', Icon: GraduationCap, image: 'https://plus.unsplash.com/premium_photo-1713296255442-e9338f42aad8?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3JhZHVhdGlvbiUyMHBhcnR5fGVufDB8fDB8fHww' },
  { id: 8, title: 'Other Occasions', Icon: Gift, image: 'https://media.istockphoto.com/id/479977238/photo/table-setting-for-an-event-party-or-wedding-reception.jpg?s=612x612&w=0&k=20&c=yIKLzW7wMydqmuItTTtUGS5cYTmrRGy0rXk81AltdTA=' },
];

export default function OccasionsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOccasions = occasions.filter((occasion) =>
    occasion.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Occasions | Mera Bestie</title>
      </Helmet>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-pink-800 mb-10 drop-shadow-lg">
            Shop by Occasion
          </h1>

          <div className="flex justify-center mb-8">
            <SearchInput value={searchTerm} onChange={setSearchTerm} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-14">
            {filteredOccasions.map((occasion) => (
              <OccasionCard
                key={occasion.id}
                title={occasion.title}
                Icon={occasion.Icon}
                image={occasion.image}
                className="transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:bg-pink-100"
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

function SearchInput({ value, onChange }) {
  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 text-gray-700 border border-pink-300 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-500 focus:outline-none"
        placeholder="Search occasions..."
      />
      <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-pink-400 w-5 h-5" />
    </div>
  );
}

function OccasionCard({ title, Icon, image, className }) {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-lg text-center overflow-hidden ${className}`}>
      <div className="flex justify-center items-center bg-gray-100">
        <img
          src={image}
          alt={title}
          className="object-cover rounded-full my-4"
          style={{ width: '150px', height: '150px' }}
          onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
        />
      </div>
      <div className="p-4">
        <Icon className="w-12 h-12 text-pink-500 mx-auto mb-4 animate-bounce" />
        <h3 className="text-lg font-semibold text-pink-700">{title}</h3>
      </div>
    </div>
  );
}
