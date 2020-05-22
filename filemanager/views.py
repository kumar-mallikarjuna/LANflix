from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

import magic
import os
import subprocess

def unrendered_path(path):
    return r'./filemanager/files/{}'.format(path)

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
               unrendered_path(path)))
            data['folders'] = dirs
            data['files'] = files
            mimes = []
            for f in files:
                mimes.append(
                    mime.from_file(unrendered_path(path + "/" + f)))
            data["mimes"] = mimes
        except Exception:
            pass
        return Response(data)


class Subs(APIView):
    renderer_classes = [JSONRenderer]

    def get(self, request):
        data = {}
        path = ''

        if ('path' in request.GET and
                '..' not in request.GET['path'].strip('/')):
            path = request.GET['path']

        try:
            loc = path[:path.rfind('/')]
            fname = path[path.rfind('/')+1:]
            name = fname[:fname.rfind('.')]

            print(path[:path.rfind('.')])

            (_, _, files) = next(os.walk(unrendered_path(loc)))

            if (name + ".vtt" in files):
                data['sub'] = loc + "/" + name + ".vtt"
            elif (name + ".srt" in files and name + ".vtt" not in files):
                subprocess.run(("ffmpeg",
                                "-i",
                                unrendered_path(loc + "/" + name + ".srt"),
                                unrendered_path(loc + "/" + name+".vtt")),
                                stdout=subprocess.PIPE)
                data['sub'] = loc + "/" + name + ".vtt"
            else:
                subprocess.run(("ffmpeg",
                                "-i",
                                unrendered_path(loc + "/" + fname),
                                unrendered_path(loc + "/" + name+".vtt")),
                                stdout=subprocess.PIPE)
                data['sub'] = loc + "/" + name + ".vtt"
        except Exception:
            pass

        return Response(data)
