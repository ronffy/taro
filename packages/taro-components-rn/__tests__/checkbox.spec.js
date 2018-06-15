import React from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import { Label, Checkbox, CheckboxGroup } from '../src'
import renderer from 'react-test-renderer'

describe('<Checkbox />', () => {
  describe('<Checkbox />', () => {
    it('default', () => {
      const tree = renderer.create(<Checkbox />).toJSON()
      expect(tree).toMatchSnapshot()
    })

    describe('onPress', () => {
      it('normal', () => {
        const onChange = sinon.spy()
        const wrapper = shallow(
          <Checkbox onChange={onChange} />
        )
        wrapper.find(TouchableWithoutFeedback).at(0).props().onPress()
        expect(onChange.calledOnce).toBe(true)
        expect(wrapper.state('checked')).toBe(true)
      })

      it('disabled', () => {
        const onChange = sinon.spy()
        const wrapper = shallow(
          <Checkbox onChange={onChange} disabled={true} />
        )
        wrapper.find(TouchableWithoutFeedback).at(0).props().onPress()
        expect(onChange.calledOnce).toBe(false)
        expect(wrapper.state('checked')).toBe(false)
      })
    })
  })

  describe('<CheckboxGroup />', () => {
    it('should render well', () => {
      const spy = sinon.spy()
      const wrapper = shallow(
        <CheckboxGroup onChange={spy} style={{ flexDirection: 'row' }}>
          <View><View /></View>
          <Label><Checkbox value={0} /></Label>
          <Label><Checkbox value={1} /></Label>
          <Label><Checkbox value={2} /></Label>
        </CheckboxGroup>
      )
      wrapper.find(Checkbox).at(0).props().onChange({ checked: true })
      expect(spy.calledOnce).toBe(true)
      wrapper.find(Checkbox).at(0).props().onChange({ checked: false })
      expect(spy.calledTwice).toBe(true)
      wrapper.find(Checkbox).at(1).props().onChange({ checked: true })
      wrapper.find(Checkbox).at(2).props().onChange({ checked: true })
      expect(spy.callCount).toBe(4)
    })
  })
})
