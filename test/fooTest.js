/**
 * Created by sakariruoho on 11/12/15.
 */
import Foo from '../src/foo.js';
import $ from 'jquery';
import React from 'react';
import Components from '../src/base/components/components.js';

describe('ES6 Foo', function () {

    let foo;

    beforeEach(()=>{
        foo = new Foo();
    });

    it('should return Do Something when calling doSomething', ()=>{
        expect(foo.doSomething()).toEqual('Do Something');
    });
});