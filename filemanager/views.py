from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

import os


class DirContents(APIView):
    renderer_classes = [JSONRenderer]

    def get(self, request):
        data = {'folders': [], 'files': []}

        path = ''
        if ('path' in request.GET and
                '..' not in request.GET['path'].strip('/')):
            path = request.GET['path']

        print(path)
        try:
            (dirp, dirs, files) = next(os.walk(
               r'./filemanager/files/{}'.format(path)))
            data['folders'] = dirs
            data['files'] = files
        except Exception:
            pass
        return Response(data)
