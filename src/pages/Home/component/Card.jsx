import { useNavigate } from "react-router";
import PropTypes from "prop-types";

const Card = ({ course }) => {
  const navigate = useNavigate();

  // Handle instructor data
  const [name, role] = course.instructor.split("\n");

  const handleClick = () => {
    navigate("/detail", { state: course });
  };

  return (
    <div className="flex flex-col bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer h-full" onClick={handleClick}>
      <img src={course.image} alt={course.title} className="w-full h-40 object-cover rounded-md mb-3" />

      <div className="flex flex-col flex-grow">
        <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 mb-2">{course.title}</h3>

        <div className="flex items-center gap-2 mt-auto">
          <img src="/avatar/satu.png" alt={name} className="w-6 h-6 rounded-full object-cover" />
          <div>
            <p className="text-xs font-medium">{name}</p>
            <p className="text-xs text-gray-400">{role}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>
          <span className="text-xs text-gray-400 ml-1">{course.rating}</span>
        </div>

        {/* Tampilkan Sprice jika ada, fallback ke format default */}
        <p className="text-sm font-semibold text-[#3ECF4C]">{`Rp ${course.price}K`}</p>
      </div>
    </div>
  );
};

Card.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    instructor: PropTypes.string,
    price: PropTypes.number,
    Sprice: PropTypes.string,
    rating: PropTypes.string,
    image: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
};

export default Card;
