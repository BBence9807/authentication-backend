import express, {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {User} from '../model/User';
import {DatabaseServer} from "../config/DatabaseServer";
import {logger} from "../logger/AuthLogger";

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
    const { username, password } = req.body;


    try {
        const userRepository = DatabaseServer.getInstance().getDataSource().getRepository(User);
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const user = new User();
        user.username = username;
        user.password = hashedPassword;

        // Save the user to the database
        await userRepository.save(user)

        logger.info('User registered successfully');

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        logger.error('An error occurred', { error });
        res.status(500).json({ message: 'An error occurred' });
    }
});

router.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const userRepository = DatabaseServer.getInstance().getDataSource().getRepository(User);
        // Find the user in the database
        //const user = await entityManager.findOne(User,{ where: { username } });
        const user = await userRepository.findOne({ where: { username } });

        if (!user) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        // Compare the password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        // Generate a JWT
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        logger.info('User logged in successfully');
        res.json({ token });
    } catch (error) {
        logger.error('An error occurred', { error });

        res.status(500).json({ message: 'An error occurred' });
    }
});

export default router;
