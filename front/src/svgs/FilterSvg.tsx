import { useDataContext } from "../components/contexts/DataContext";

const FilterSvg = () => {
    const {isDarkMode} = useDataContext()
    return ( <svg fill={isDarkMode ? "#155dfc" : "#5b6069"} width="35px" height="35px" viewBox="0 0 24 24" id="filter-alt-3" xmlns="http://www.w3.org/2000/svg" className="hover:animate-bounce duration-500"><path id="primary" d="M20.62,3.17A2,2,0,0,0,18.8,2H5.2A2,2,0,0,0,3.7,5.32L9,11.38V21a1,1,0,0,0,.47.85A1,1,0,0,0,10,22a1,1,0,0,0,.45-.11l4-2A1,1,0,0,0,15,19V11.38l5.3-6.06A2,2,0,0,0,20.62,3.17Z"></path></svg> );
}
 
export default FilterSvg;