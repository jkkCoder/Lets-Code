import {Router} from "express"
import { editProfile, getBookmarks, getUserByToken, loginUser, registerUser, updateProfile, userProfile } from "../controllers/userController.js";
import { requireLogin } from "../middleware/authMiddleware.js";
import path, {dirname} from "path"
import { fileURLToPath } from 'url';
import multer from 'multer';

const router = Router()


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../images'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      req.uploadError = true 
      req.uploadErrorMsg = 'Only images are allowed'
      return callback(null, false)
    }
    callback(null, true)
},
});

router.post("/login", loginUser)
router.post("/register", registerUser)
router.get('/getUser/:token', getUserByToken)
router.get('/profile/:userId', userProfile)
router.put('/editProfile/:id', requireLogin, editProfile)
router.get('/getBookmarks', requireLogin, getBookmarks)      
router.post('/updateProfile',requireLogin, upload.single('profile'), updateProfile)
export default router;
