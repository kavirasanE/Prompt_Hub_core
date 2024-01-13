import React, { useEffect } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { fetchData, onNavigateNext,onNavigatePrev,onClickCurrentPage } from './redux/dataSlice';
import dataSlice from './redux/dataSlice';
const Table = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.data.data); 
  const datasPerPage = useSelector(state => state.data.pages.datasPerPage);
  const currentPage = useSelector(state => state.data.pages.currentPage);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const totalPages = Math.ceil(data.length / datasPerPage);
  const page = Array.from({ length: totalPages }, (_, index) => index + 1);
  const indexOfLastPage = currentPage * datasPerPage;
  const indexOfFirstPage = indexOfLastPage - datasPerPage;
  const visibleDatas = data.slice(indexOfFirstPage, indexOfLastPage);

  const navigatePrev = () => {
    if (currentPage !== 1) {
      dispatch(onNavigatePrev());
    }
  };

  const navigateNext = () => {
    if (currentPage < totalPages) {
      dispatch(onNavigateNext());
    }
  };

  const handleCurrentPage = (e) => {
    dispatch(onClickCurrentPage(e));
  };

  return (
    <div>
      <nav>
        <button onClick={navigatePrev}>Prev</button>
        <button type='button' onClick={navigateNext}>Next</button>
      </nav>
  
    <div className='top-0 left-0 text-sm'>
    <div className='justify-start items-center'>
      <table className='border-2 border-black '>
      <thead className='border-2 border-black'>
        <tr className='border-2 border-black'>
          <th className='border-2 border-black'>ID</th>
          <th>Name</th>
          <th>Tagline</th>
          <th>ABV</th>
          <th>IBU</th>
          <th>First Brewed</th>
          <th>Description</th>
          <th>Image</th>
          <th>Target FG</th>
          <th>Target OG</th>
          <th>EBC</th>
          <th>SRM</th>
          <th>pH</th>
          <th>Attenuation Level</th>
          <th>Volume</th>
          <th>Boil Volume</th>
          <th>Method - Mash Temp</th>
          <th>Method - Fermentation Temp</th>
          <th>Ingredients - Malt</th>
          <th>Ingredients - Hops</th>
          <th>Ingredients - Yeast</th>
          <th>Food Pairing</th>
          <th>Brewer's Tips</th>
          <th>Contributed By</th>
        </tr>
      </thead>
      <tbody className='border-2 border-black'>
        {data.map((item) => (
          <tr key={item.id} className='border-2 border-black'>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.tagline}</td>
            <td>{item.abv}</td>
            <td>{item.ibu}</td>
            <td>{item.first_brewed}</td>
            <td>{item.description}</td>
            <td>
              <img src={item.image_url} alt={item.name} style={{ maxWidth: '100px', maxHeight: '100px' }} />
            </td>
            <td>{item.target_fg}</td>
            <td>{item.target_og}</td>
            <td>{item.ebc}</td>
            <td>{item.srm}</td>
            <td>{item.ph}</td>
            <td>{item.attenuation_level}</td>
            <td>{item.volume.value} {item.volume.unit}</td>
            <td>{item.boil_volume.value} {item.boil_volume.unit}</td>
            <td>{item.method.mash_temp[0].temp.value} {item.method.mash_temp[0].temp.unit}, {item.method.mash_temp[0].duration} min</td>
            <td>{item.method.fermentation.temp.value} {item.method.fermentation.temp.unit}</td>
            <td>
              <ul>
                {item.ingredients.malt.map((malt, index) => (
                  <li key={index}>{`${malt.amount.value} ${malt.amount.unit} of ${malt.name}`}</li>
                ))}
              </ul>
            </td>
            <td>
              <ul>
                {item.ingredients.hops.map((hop, index) => (
                  <li key={index}>{`${hop.amount.value} ${hop.amount.unit} of ${hop.name} - ${hop.add} - ${hop.attribute}`}</li>
                ))}
              </ul>
            </td>
            <td>{item.ingredients.yeast}</td>
            <td>
              <ul>
                {item.food_pairing.map((food, index) => (
                  <li key={index}>{food}</li>
                ))}
              </ul>
            </td>
            <td>{item.brewers_tips}</td>
            <td>{item.contributed_by}</td>
           
          </tr>
        ))}
      </tbody>
    </table>
        
    </div>
    </div>
    </div>
  )
}

export default Table
