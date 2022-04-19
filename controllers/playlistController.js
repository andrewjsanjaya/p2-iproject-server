const { Playlist, User } = require("../models");
const axios = require("axios");

class Controller {
  static async playlist(req, res, next) {
    try {
      const { city } = req.user;
      let { page } = req.query;
      let size = 6;

      if (!page) {
        page = 0;
      } else {
        page--;
      }

      let dataWeather = await axios.get(
        "http://api.weatherapi.com/v1/current.json",
        {
          params: {
            key: process.env.WeatherApiKey,
            q: city,
          },
        }
      );

      dataWeather = dataWeather.data.current.condition;
      let weatherIcon = dataWeather.icon;
      let weather = dataWeather.text.toLowerCase();
      let q;

      if (weather.includes("sunny") || weather.includes("cloudy")) {
        q = "pop";
      } else if (
        weather.includes("overcast") ||
        weather.includes("mist") ||
        weather.includes("rain") ||
        weather.includes("thunder") ||
        weather.includes("fog") ||
        weather.includes("drizzle")
      ) {
        q = "indie";
      } else {
        q = "jazz";
      }

      let dataMusic = await axios.get(
        "https://spotify23.p.rapidapi.com/search/",
        {
          params: {
            q: q,
            type: "multi",
            offset: size * page,
            limit: size,
            numberOfTopResults: "5",
          },
          headers: {
            "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
            "X-RapidAPI-Key":
              "5f5541a816mshba2860753a9fe47p1650d3jsn6d12be868ab9",
          },
        }
      );

      let playlists = dataMusic.data.playlists.items.map((el) => {
        return {
          name: el.data.name,
          description: el.data.description,
          link: el.data.uri,
          imageUrl: el.data.images.items[0].sources[0].url,
        };
      });

      let genres = dataMusic.data.genres.items.map((el) => {
        return {
          name: el.data.name,
        };
      });

      let tracks = dataMusic.data.tracks.items.map((el) => {
        return {
          name: el.data.name,
          link: el.data.uri,
          imageUrl: el.data.albumOfTrack.coverArt.sources[0].url,
        };
      });

      const music = {
        playlists,
        genres,
        tracks,
      };

      res.status(200).json({ weather, music });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
