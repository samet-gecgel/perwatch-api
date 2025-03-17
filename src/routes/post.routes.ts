import { Router } from "express";
import * as postController from "../controllers/post.controller";
import { validate } from "../middlewares/validate.middleware";
import { postValidation } from "../validations/post.validation";

const router = Router();

/**
 * @swagger
 * /api/posts:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Tüm gönderileri listeler
 *     description: Sistemdeki tüm gönderileri getirir
 *     responses:
 *       200:
 *         description: Gönderiler başarıyla listelendi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 results:
 *                   type: integer
 *                   example: 10
 *                 data:
 *                   type: object
 *                   properties:
 *                     posts:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Post'
 */
router.get("/", postController.getAllPosts);

/**
 * @swagger
 * /api/posts/user/{userId}:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Kullanıcıya ait gönderileri listeler
 *     description: Belirtilen kullanıcı ID'sine ait tüm gönderileri getirir
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: Kullanıcı ID
 *     responses:
 *       200:
 *         description: Gönderiler başarıyla listelendi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     posts:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Post'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.get("/user/:userId", postController.getPostsByUser);

/**
 * @swagger
 * /api/posts/tag/{tag}:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Etikete göre gönderileri listeler
 *     description: Belirtilen etikete sahip tüm gönderileri getirir
 *     parameters:
 *       - in: path
 *         name: tag
 *         required: true
 *         schema:
 *           type: string
 *         description: Etiket adı
 *     responses:
 *       200:
 *         description: Gönderiler başarıyla listelendi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     posts:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Post'
 */
router.get("/tag/:tag", postController.getPostsByTag);

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     tags:
 *       - Posts
 *     summary: ID'ye göre gönderi getirir
 *     description: Belirtilen ID'ye sahip gönderiyi getirir
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Gönderi ID
 *     responses:
 *       200:
 *         description: Gönderi başarıyla getirildi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.get("/:id", postController.getPostById);

/**
 * @swagger
 * /api/posts:
 *   post:
 *     tags:
 *       - Posts
 *     summary: Yeni gönderi oluşturur
 *     description: Yeni bir gönderi kaydı oluşturur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - author
 *               - tags
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Gönderi Başlığı"
 *               content:
 *                 type: string
 *                 example: "Gönderi içeriği burada yer alacak."
 *               author:
 *                 type: string
 *                 example: "507f1f77bcf86cd799439011"
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["etiket1", "etiket2"]
 *     responses:
 *       201:
 *         description: Gönderi başarıyla oluşturuldu
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */
router.post("/", validate(postValidation.createPost), postController.createPost);

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     tags:
 *       - Posts
 *     summary: Gönderi bilgilerini günceller
 *     description: Belirtilen ID'ye sahip gönderinin bilgilerini günceller
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Gönderi ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Güncellenmiş Başlık"
 *               content:
 *                 type: string
 *                 example: "Güncellenmiş içerik burada yer alacak."
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["yeniEtiket1", "yeniEtiket2"]
 *     responses:
 *       200:
 *         description: Gönderi başarıyla güncellendi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.put("/:id", validate(postValidation.updatePost), postController.updatePost);

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     tags:
 *       - Posts
 *     summary: Gönderiyi siler
 *     description: Belirtilen ID'ye sahip gönderiyi sistemden siler
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Gönderi ID
 *     responses:
 *       204:
 *         description: Gönderi başarıyla silindi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Gönderi başarıyla silindi"
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.delete("/:id", postController.deletePost);

export default router;