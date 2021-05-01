import { v4 } from 'uuid';

const uuidV4 = () => v4().replace(/-/g, '');

export default uuidV4;
