import React, {useEffect,useState} from 'react'
import {Grid,  Button, Divider, AppBar, Toolbar, Typography, ListItemSecondaryAction} from '@material-ui/core'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import Distance from 'geo-distance'
import geoDistance from 'geo-distance-helper';

function App() {

  const [CurrentLocation, setCurrentLocation] = useState([])

  const getCurrentLocation = async ()=>{
    if (navigator.geolocation) {
      console.log(navigator.geolocation)
      alert("GeoLocation is Available!");
      await navigator.geolocation.getCurrentPosition(function(position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        setCurrentLocation([position.coords?.latitude, position.coords?.longitude])
      });
      } else {
      alert("Sorry Not available!");
    }
    
  }

  const [HoleLocation, setHoleLocation] = useState([
    {
      hole:1,
      location:[-4.204630, 121.605131],
      distance:0
    },
    {
      hole:2,
      location:[-4.206637, 121.603560],
      distance:0
    },
    {
      hole:3,
      location:[-4.204244, 121.603034],
      distance:0
    },
    {
      hole:4,
      location:[-4.204344, 121.604119],
      distance:0
    },
    {
      hole:5,
      location:[-4.203019, 121.602425],
      distance:0
    },
    {
      hole:6,
      location:[-4.203042, 121.604491],
      distance:0
    },
    {
      hole:7,
      location:[-4.203702, 121.606904],
      distance:0
    },
    {
      hole:8,
      location:[-4.201297, 121.603387],
      distance:0
    },
    {
      hole:9,
      location:[-4.198227, 121.600816],
      distance:0
    },
    {
      hole:10,
      location:[-4.200377,121.6009718],
      distance:0
    },
    {
      hole:11,
      location:[-4.197922, 121.598467],
      distance:0
    },
    {
      hole:12,
      location:[-4.196906, 121.599570],
      distance:0
    },
    {
      hole:13,
      location:[-4.198360, 121.600207],
      distance:0
    },
    {
      hole:14,
      location:[-4.200245, 121.604097],
      distance:0
    },
    {
      hole:15,
      location:[-4.202803, 121.607213],
      distance:0
    },
    {
      hole:16,
      location:[-4.204665, 121.609265],
      distance:0
    },
    {
      hole:17,
      location:[-4.204624, 121.606154],
      distance:0
    },
    {
      hole:18,
      location:[-4.203409, 121.605207],
      distance:0
    }
  ])

  useEffect(()=>{
    getCurrentLocation()
  },[])

  const HoleDistance = ()=>{
    var dataDistance = HoleLocation.map(itemHole =>{
      if(itemHole.location.length>0){
        var PinLocation = {
          lat: itemHole.location[0],
          lng: itemHole.location[1]
        };
        var MyLocation = {
          lat: CurrentLocation[0],
          lng: CurrentLocation[1]
        };
        console.log('CurrentLocation', CurrentLocation)
        console.log('PinLocation' + JSON.stringify(PinLocation));
        console.log('MyLocation' + JSON.stringify(MyLocation));
        const distance = Math.floor(geoDistance(PinLocation, MyLocation, "K")*1000);
        console.log('distance' + JSON.stringify(distance));
        itemHole.distance = distance;
        // var DistanceToHole = Distance.between(PinLocation, MyLocation);
        
        // console.log('Distance' + DistanceToHole.human_readable());
        // if (DistanceToHole > Distance('800 km')) {
        //   console.log('Nice journey!');
        // }
      }
      return itemHole
    })
    setHoleLocation(dataDistance)
  }

  return (
    <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              Golf Distance
            </Typography>
          </Toolbar>
        </AppBar>
        <Typography>
          Lokasi Anda saat ini berada di titik koordinat [{CurrentLocation[0]},{CurrentLocation[1]}]          
        </Typography>
        <Button variant="contained" color="primary" onClick={async()=>
            {
              await getCurrentLocation()
              await HoleDistance()
            }
        }>Hitung Jarak ke Pin</Button>
        <List>
          {
            HoleLocation.map(item=>{
              return(
                <>
                <ListItem button>
                  <ListItemIcon>
                    <SendIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Hole - "+ item.hole} />
                  <ListItemSecondaryAction>
                    <Typography>Jarak: {item.distance} meter</Typography>
                    <small>{JSON.stringify(item.location)}</small>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                </>
              )
            })
          }
          
        </List>
    </div>
  );
}

export default App;
