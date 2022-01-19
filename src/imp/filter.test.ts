import {expect, use, spy} from 'chai';
import spies from 'chai-spies';
import { filter } from './filter';
use(spies);

describe('filter by severity',()=>{
  it('should call action if asked severity more severe that the allowed',()=>{
    const action = spy();
    filter('error','verbose',action);
    expect(action).to.have.been.called();
  });
  it('should call action if severity is the same',()=>{
    const action = spy();
    filter('error','error',action);
    expect(action).to.have.been.called();
  });
  it('should not call action when severity is lower than allowed',()=>{
    const action = spy();
    filter('verbose','error',action);
    expect(action).have.not.been.called();
  });
});
