import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

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
const apiKey = '5Muqe6HOngq40S9xI6ZQJ7jDfvZUoS5f'

function App() {
  let [giphyData, setGiphyData] = useState({})
  let [search, setSearch] = useState('')
  let [selectedImage, setSelectedImage] = useState(null)
  let [lastTypedCallId, setLastTypedCallId] = useState(null)

  useEffect(() => {
    // If there's no search term, show trending
    if (search == '') {
      let data = axios.get(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}`)
        .then(response => {
          setGiphyData(response)
        })
      return
      // If search term, show search results
    } else {
      // After the user types, set a time
      // After now - last typed time > 1 second, then do search request

      // let id = setTimeout(() => {
      //   let lastTimeTyped = new Date(JSON.parse(sessionStorage.lastTimeTyped))
      //   console.log(`Current Time: ${new Date().getMilliseconds()}`)
      //   console.log(`Last Time Typed: ${lastTimeTyped.getMilliseconds()}`)
      //   if (getDifferenceInTimeByMilliseconds(new Date(), lastTimeTyped) > 1000) {
      //     console.log('=== Worked ===')
      //     let data = axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${search}`)
      //     .then(response => {
      //       setGiphyData(response)
      //     })
      //   }
      // }, 1000)

      let id = setTimeout(() => {
        let data = axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${search}`)
          .then(response => {
            setGiphyData(response)
          })
      }, 1000)

      setLastTypedCallId(id)

      /**
       * 
       * - setTimeout => returns an id
       * - You can window.clearTimeout(id) to stop that timeout from happening
       * - Whenever the user types, clear the timeout
       * 
       */
    }
  }, [search])

  function getDifferenceInTimeByMilliseconds(now, lastTimeTyped) {
    return Math.abs(now - lastTimeTyped)
  }

  function handleSearch(searchTerm) {
    // sessionStorage.setItem('lastTimeTyped', JSON.stringify(new Date()))
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
        <div>
          {
            selectedImage &&
            (
              <div>
                <pre>
                  {/* {JSON.stringify(selectedImage, null, 2)} */}
                  <img src={selectedImage?.images?.original?.url} />
                </pre>
                <button onClick={() => setSelectedImage(null)}>Dismiss</button>
              </div>
            )
          }
        </div>
        <div>
          {/* {JSON.stringify(giphyData.data.data)} */}
          {
            giphyData &&
            giphyData?.data?.data?.map(entry => (
              <div onClick={() => setSelectedImage(entry)}>
                {/* {JSON.stringify(entry, null, 2)} */}
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
