from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

import magic

import os


class DirContents(APIView):
    renderer_classes = [JSONRenderer]

    def get(self, request):
        mime = magic.Magic(mime=True, uncompress='true')
        data = {'folders': [], 'files': [], 'mimes': []}

        path = ''
        if ('path' in request.GET and
                '..' not in request.GET['path'].strip('/')):
            path = request.GET['path']

        try:
            (dirp, dirs, files) = next(os.walk(
               r'./filemanager/files/{}'.format(path)))
            data['folders'] = dirs
            data['files'] = files
            mimes = []
            for f in files:
                mimes.append(
                    mime.from_file('./filemanager/files/{}'.format(path
                                                                   + "/" + f)))
            data["mimes"] = mimes
        except Exception:
            pass
        return Response(data)
