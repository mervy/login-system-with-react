import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()

router.post('/signup', async (req, res) => {

    const { firstName, lastName, email, password, isActive } = req.body

    try {
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            isActive: true
        })

        await user.save()

        res.status(201).json({ message: 'User created sucess' })

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar se o usuário existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Comparar a senha fornecida com a hash armazenada
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Informações para incluir no token
        const tokenPayload = {
            id: user._id,
            email: user.email,
        };

        // Gerar o token JWT
        const token = jwt.sign(
            tokenPayload,
            process.env.JWT_SECRET, // Chave secreta para assinar o token
            { expiresIn: '1h' } // Opção para o token expirar em 1 hora
        );       

        // Retornar sucesso
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
})

router.get('/dashboard', async(req, res) =>{
    try {
        const users = await User.find().lean();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: "Listing users failed"})
    }
})

export default router