import express from 'express'
import http from 'http'
import mongoose from 'mongoose'
import { config } from './config/config'

const router = express()

// connect to Mongo
mongoose.connect(config.mongo.url)