
import manager from '../manager'
import pArray from './pArray'
import pClass from './pClass'
import pComponent from './pComponent'
import pDriver from './pDriver'
import pNumber from './pNumber'
import pString from './pString'
import * as pDecorator from './decorator'

export {
    pArray,
    pComponent,
    pClass,
    pDecorator,
    pDriver,
    pNumber,
    pString,
}


manager.debug.register('utils', { pArray, pComponent, pClass, pDecorator, pDriver, pNumber, pString })


