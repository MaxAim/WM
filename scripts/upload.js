(function() {

  'use strict';
  var original;

  var awsFields = ['accessKeyId', 'policy', 'signature', 'bucket'];

  function enableFields(ids) {
    ids.forEach(function(id) {
      document.getElementById(id).removeAttribute('disabled');
    })
  }

  function inputsComplete(ids) {
    return ids.every(function(id) {
      var val = document.getElementById(id);
      return !!val.value;
    });
  }

  function setText(input) {
    var group = input.parentNode.parentNode.parentNode;
    group.querySelector('.form-control').value = input.files[0].name;
  }

  function setTarget(file) {
    enableFields(['watermark-button']);
    Array.prototype.forEach.call(document.querySelectorAll('input[type=radio]'), function (radio) {
      radio.removeAttribute('disabled');
    });
    watermark([file])
      .image(function(target) { return target;  })
      .then(function (img) {
        document.getElementById('preview').appendChild(img);
      });
  }

  function setWatermark(file) {
    var preview = document.getElementById('preview'),
        img = preview.querySelector('img'),
        position = document.querySelector('input[type=radio]:checked').value;

    if (! original) {
      original = img;
    }

    watermark([original, file])
      .image(watermark.image.upperRight(1.0))
      .load([file])
      .image(watermark.image.lowerRight(1.0))
      .then(function(marked) {
        document.getElementById('preview').appendChild(img);
        preview.replaceChild(marked, img);
        enableFields(awsFields);
      });
  }

  function isWatermarkSelected() {
    var watermark = document.getElementById('watermark-name');
    return !!watermark.value;
  }

  function getFormData(blob, filename, accessKeyId, policy, signature) {
    var fd = new FormData(),
        params = {
          key: filename,
          AWSAccessKeyId: accessKeyId,
          acl: 'private',
          policy: policy,
          signature: signature,
          'Content-Type': '$Content-Type',
          file: [blob, 'watermark.png']
        };

    for (var k in params) {
      var args = Array.isArray(params[k]) ? params[k] : [params[k]];
      fd.append.apply(fd, [k].concat(args));
    }

    return fd;
  }

  document.addEventListener('DOMContentLoaded', function () {

    document.addEventListener('change', function (e) {
      var input = e.target;

      if (input.type === 'file') {
        setText(input);
        input.id === 'target' ? setTarget(input.files[0]) : setWatermark(input.files[0]);
      }

      if (input.type === 'radio' && isWatermarkSelected()) {
        setWatermark(document.getElementById('watermark').files[0]);
      }
    });

    awsFields.forEach(function (id) {
      document.getElementById(id).addEventListener('keyup', function () {
        if (inputsComplete(awsFields)) {
          enableFields(['upload']);
        }
      });
    });

    var form = document.getElementById('uploadForm');
    form.addEventListener('submit', function (e) {
      var progress = document.getElementById('progress'),
          bar = progress.querySelector('.progress-bar'),
          complete = document.getElementById('complete'),
          err = document.getElementById('error');

      progress.style.visibility = 'visible';

      upload(function(e) {
        if (e.lengthComputable) {
          var percent = (e.loaded / e.total) * 100;
          bar.style.width = percent + "%";
        }
      }, function () {
        complete.style.display = 'block';
        err.style.display = 'none';
      }, function () {
        err.style.display = 'block';
        complete.style.display = 'none';
      });

      e.preventDefault();
    });


  });


})();

