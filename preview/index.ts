import Bundler from '@bundler';
import { listenForWindowMessage, sendMessageFromPreview } from '@common/utils';

let bundler: Bundler;

sendMessageFromPreview({ type: 'BUNDLER_READY' });

listenForWindowMessage((evt) => {
  switch (evt.data.type) {
    case 'BUNDLE': {
      const { files } = evt.data.payload;

      bundler = new Bundler({ files });

      bundler.listen((event) => {
        const eventElem = document.getElementById('event');

        if (eventElem) {
          eventElem.innerText = event;
        }

        sendMessageFromPreview({ type: 'EVENT', payload: { event } });
      });

      bundler
        .bundle()
        .then(() => {
          sendMessageFromPreview({ type: 'BUNDLE_READY' });
        })
        .catch((err) => {
          sendMessageFromPreview({ type: 'ERR', payload: { err } });
        });

      break;
    }
    case 'RUN': {
      bundler.run();

      break;
    }
    case 'PATCH': {
      const { files } = evt.data.payload;

      bundler.update(files);
    }
  }
});
