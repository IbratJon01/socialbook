import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as React from 'react';
import LongMenu from '../Account/LongMenu';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { pdfjs } from 'react-pdf';
import { getStorage, deleteObject, ref } from "firebase/storage";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard(props) {
  const [expanded, setExpanded] = React.useState(false);

  console.log(props.postData);

   const handleExpandClick = () => {
    setExpanded(!expanded);
   };

    const handleDeleteClick = () => {
      const postId =props; // postdan ma'lumotlarni olish uchun post.id ni olib foydalanamiz
      console.log(postId.id1);
      handleDelete(postId);
    };

    const handleDeleteFribase = async (postId) => {
   
        try {
          console.log(postId.postData.file);
       
          const storage = getStorage(); // getStorage funksiyasini chaqiring, unga oid Storage o'rnating
          const storageRef = ref(storage,  postId.postData.file);
          await deleteObject(storageRef);
        } catch (error) {
          console.log(error);
        }
      
    };
    const handleDeleteFriImage = async (postId) => {
      if (window.confirm("Haqiqatan ham ushbu maqolani o'chirishga ishonchingiz komilmi?")) {
        try {
          console.log(postId.postData.file);
       
          const storage = getStorage(); // getStorage funksiyasini chaqiring, unga oid Storage o'rnating
          const storageRef = ref(storage,  postId.postData.postPath );
          await deleteObject(storageRef);
        } catch (error) {
          console.log(error);
        }
      }
    };
  
    const deletePostFromServer = async (postId) => {
    try {
      const deleteUrl = `http://localhost:8080/post/delete/${postId.id1}`;
  
      const requestOptions = {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
      };
  
      const response = await fetch(deleteUrl, requestOptions);
      const data = await response.json();
      console.log("Post muvaffaqiyatli o'chirildi serverdan!", data);
    } catch (error) {
      console.error("Xato yuz berdi: Serverdan o'chirishda xato:", error);
    }
    };
  
    const handleDelete = async (postId) => {
    try {
      // await deletePostFromFirestore(postId);
      await deletePostFromServer(postId);
      await  handleDeleteFribase(postId);
      await handleDeleteFriImage(postId);
      console.log("Post muvaffaqiyatli o'chirildi Firebase Firestore va serverdan!");
    } catch (error) {
      console.error("Xato yuz berdi: Postni o'chirishda xato:", error);
    }
    };



  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const pdfUrl=props.postData.file

  return (
  
    <Card style={{marginTop:10}}>
      <CardHeader 
        avatar={
          <Avatar className="post__image" src="" />
        }
        action={
          <IconButton aria-label="settings">
              <LongMenu deletePost={handleDeleteClick} postId={props.postData.postId} />
          </IconButton>
        }
        title={props.postData.userName}
        subheader={<div>Locations:{props.postData.localDate}</div>}
      />
      <CardMedia
        component="img"
        height="auto"
        image={props.postData.postPath}
        alt="Paella dish"
 
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
           {props.postData.information}
          
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
        component="span"
        color="primary"
        aria-label="open pdf"
        onClick={() => {
          window.open(pdfUrl, "_blank");
        }}
      >
        <AttachFileIcon />
      </IconButton>
     
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
    
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}