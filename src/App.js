import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { Modal } from './modal/Modal';
import { getSearchedGIFs, getTrendingGIFs } from './services/giphy_api';

// On Initial Load => Trending GIFs

/**
useEffect(() => {
    // Load Trending
    // Based on Search ==> Rerender with different API
}, [search])
*/

// Search Box
/**
let [search, setSearch] = useState("")
 */

// On Click of GIF
/**
let viewGIF = (gif_id) => {
    // Do some cool stuff for a modal
}
 */

function App() {
  let [giphyData, setGiphyData] = useState({})
  let [search, setSearch] = useState('')
  let [selectedImage, setSelectedImage] = useState(null)
  let [lastTypedCallId, setLastTypedCallId] = useState(null)

  useEffect(() => {
    // If there's no search term, show trending
    if (search == '') {
      // TRENDING
      getTrendingGIFs().then(res => setGiphyData(res))
      return
    // If search term, show search results
    } else {
      let id = setTimeout(() => {
        // SEARCH
        getSearchedGIFs(search).then(res => setGiphyData(res))
      }, 1000)

      setLastTypedCallId(id)
    }
  }, [search])

  function handleSearch(searchTerm) {
    try {
       if (lastTypedCallId) {
         window.clearTimeout(lastTypedCallId)
       }
    } catch (e) {
      // ---
    }
    setSearch(searchTerm)
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>{search}</p>
        <input type="text" value={search} onChange={e => handleSearch(e.target.value)} />
        {
          selectedImage &&
          <Modal imageData={selectedImage} onDismiss={() => setSelectedImage(null)} />
        }
        <div>
          {
            giphyData &&
            giphyData?.data?.data?.map(entry => (
              <div key={entry.id} onClick={() => setSelectedImage(entry)}>
                <img src={entry.images.downsized.url} />
              </div>
            ))
          }
        </div>
      </header>
    </div>
  );
}

const getTrendingData = async () => {
}

export default App;
