import {
  getPorts,
  makePortName,
  getImageStreamByNamespace,
  getImageStreamTags,
} from '../imagestream-utils';
import { ImageStreamTagData, sampleImageStreams } from './imagestream-test-data';

describe('Transform image ports to k8s structure', () => {
  it('expect port object to be transformed into k8s structure', () => {
    expect(getPorts(ImageStreamTagData)).toEqual([
      { containerPort: 8080, protocol: 'TCP' },
      { containerPort: 8888, protocol: 'TCP' },
    ]);
  });
});

describe('Transform container port name', () => {
  it('expect port object to be transformed with cli naming convention', () => {
    const ports = getPorts(ImageStreamTagData);
    expect(makePortName(ports[0])).toEqual('8080-tcp');
    expect(makePortName(ports[1])).toEqual('8888-tcp');
  });
});

describe('Transform imagestream data', () => {
  it('expect to return key: value pair for dropdown component ', () => {
    const imgStreams = getImageStreamByNamespace(sampleImageStreams, 'project-1');
    expect(imgStreams).toMatchObject({ 'os-test-image': 'os-test-image' });
  });

  it('expect to have imagestream tags', () => {
    const imgStreamsTags = getImageStreamTags(sampleImageStreams, 'os-test-image', 'project-1');
    expect(imgStreamsTags).toMatchObject({ latest: 'latest' });
  });
});
