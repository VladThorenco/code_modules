import { combineReducers } from '@reduxjs/toolkit'
import getList from './getList'
import create from './create'
import remove from './remove'
import update from './update'

export default combineReducers({ getList, create, remove, update })
