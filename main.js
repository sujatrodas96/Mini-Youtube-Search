const API_KEY = 'AIzaSyADVxptO_RPssSGfvY_82x7wbFYzng1Evg'; // Replace with your YouTube API key

        async function searchYouTube() {
            const query = document.getElementById('search-box').value.trim();
            if (!query) {
                alert('Please enter a search term!');
                return;
            }

            try {
                const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&key=${API_KEY}&maxResults=10`);
                const data = await response.json();
                displayResults(data.items);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        function displayResults(videos) {
            const resultsDiv = document.getElementById('search-results');
            resultsDiv.innerHTML = ''; // Clear previous results

            videos.forEach(video => {
                const videoDiv = document.createElement('div');
                videoDiv.classList.add('video-item');

                const thumbnail = video.snippet.thumbnails.medium.url;
                const title = video.snippet.title;
                const description = video.snippet.description;
                const videoId = video.id.videoId;

                videoDiv.innerHTML = `
                    <img src="${thumbnail}" alt="${title}" />
                    <div>
                        <h3>${title}</h3>
                        <p>${description}</p>
                    </div>
                `;

                videoDiv.addEventListener('click', () => {
                    openMiniPlayer(videoId);
                });

                resultsDiv.appendChild(videoDiv);
            });
        }

        // Miniplayer functions
        function openMiniPlayer(videoId) {
            const player = document.getElementById('miniplayer-video');
            player.src = `https://www.youtube.com/embed/${videoId}`;
            document.getElementById('miniplayer').style.display = 'block';
        }

        function closeMiniPlayer() {
            document.getElementById('miniplayer').style.display = 'none';
            document.getElementById('miniplayer-video').src = '';
        }