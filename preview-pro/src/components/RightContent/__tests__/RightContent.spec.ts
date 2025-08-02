import {describe, expect, it} from 'vitest';

import {mount} from '@vue/test-utils';
import RightContent from '../RightContent.vue';

describe('RightContent', () => {
    it('renders properly', () => {
        const currentUser = {nickname: 'Admin'};
        const wrapper = mount(RightContent, {
            props: {currentUser: currentUser},
        });
        expect(wrapper.text()).toContain(currentUser.nickname);
    });
});
