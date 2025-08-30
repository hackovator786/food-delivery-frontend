import { Card, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";

export default function Restaurants(){
    return (
        <Container sx={{ py: 6 }}>
        <Typography variant="h5" gutterBottom>
          Featured Restaurants
        </Typography>
        <Grid container spacing={3}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item}>
              <Card>
                <CardMedia
                  component="img"
                  height="160"
                  image={`https://source.unsplash.com/400x300/?restaurant,food,${item}`}
                  alt="Restaurant"
                />
                <CardContent>
                  <Typography variant="h6">Restaurant {item}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    ★★★★☆ (120 reviews)
                  </Typography>
                  <Typography variant="body2">Fast Delivery</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
}